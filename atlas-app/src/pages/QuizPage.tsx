import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { countries, landmarks } from '../data'
import { cx } from '../lib/utils'

type Mode = 'flag' | 'capital' | 'landmark'

const TOTAL_QUESTIONS = 8

const modeLabels: Record<Mode, string> = {
  flag: 'Guess the flag',
  capital: 'Guess the capital',
  landmark: 'Guess the landmark',
}

interface Question {
  id: string
  hint: string
  prompt: string
  choices: string[]
  answerId: string
}

function shuffle<T>(input: T[]): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickN<T>(input: T[], n: number): T[] {
  return shuffle(input).slice(0, n)
}

function buildQuestions(mode: Mode): Question[] {
  const questions: Question[] = []
  const pool = shuffle(countries)

  for (const answer of pool) {
    if (questions.length >= TOTAL_QUESTIONS) break

    let prompt = ''
    let hint = ''

    if (mode === 'flag') {
      prompt = answer.flag
      hint = 'Which country does this flag belong to?'
    } else if (mode === 'capital') {
      prompt = answer.capital
      hint = 'Which country has this capital city?'
    } else {
      const landmark = landmarks.find((l) => l.countryId === answer.id)
      if (!landmark) continue
      prompt = landmark.name
      hint = 'Which country is this landmark in?'
    }

    const distractors = pickN(
      countries.filter((c) => c.id !== answer.id),
      3,
    )
    if (distractors.length < 3) continue

    questions.push({
      id: `${mode}-${answer.id}`,
      hint,
      prompt,
      choices: shuffle([answer.id, ...distractors.map((c) => c.id)]),
      answerId: answer.id,
    })
  }

  return questions
}

export default function QuizPage() {
  useDocumentTitle('Quiz')

  const [mode, setMode] = useState<Mode>('flag')
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)

  const questions = useMemo(() => buildQuestions(mode), [mode, round])

  function start(nextMode: Mode) {
    setMode(nextMode)
    setRound((r) => r + 1)
    setIndex(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  function choose(id: string) {
    if (selected !== null) return
    setSelected(id)
    if (id === questions[index].answerId) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="empty">
          <h2>Not enough atlas data for a quiz yet</h2>
          <p>Add more countries to start playing.</p>
          <p style={{ marginTop: 16 }}>
            <Link to="/countries" className="btn btn--primary">
              Browse countries
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    const message =
      pct === 100
        ? 'Perfect score — you know the atlas by heart.'
        : pct >= 70
          ? 'Great work — you know your way around the world.'
          : pct >= 40
            ? 'Not bad. A little more exploring will help.'
            : 'Time to open the atlas and wander.'

    return (
      <div className="container">
        <div className="page-head">
          <h1>Quiz complete</h1>
          <p>{modeLabels[mode]}</p>
        </div>

        <div className="quiz-result">
          <p className="quiz-result__score">
            {score} / {questions.length}
          </p>
          <p style={{ color: 'var(--text-dim)', margin: 0 }}>{message}</p>
          <div className="quiz-result__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => start(mode)}
            >
              Play again
            </button>
            <Link to="/atlas" className="btn btn--ghost">
              Open the atlas
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const current = questions[index]
  const answered = selected !== null
  const answerCountry = countries.find((c) => c.id === current.answerId)
  const progress =
    ((index + (answered ? 1 : 0)) / questions.length) * 100

  return (
    <div className="container">
      <div className="page-head">
        <h1>Atlas Quiz</h1>
        <p>Test how well you know the countries in the atlas.</p>
      </div>

      <div className="chip-row" style={{ marginBottom: 24 }}>
        {(Object.keys(modeLabels) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            className={cx('chip', m === mode && 'is-active')}
            aria-pressed={m === mode}
            onClick={() => start(m)}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <div className="quiz-progress">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="quiz-progress__bar">
        <div
          className="quiz-progress__fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="quiz-card">
        <p className="quiz-card__hint">{current.hint}</p>
        <div
          className={cx(
            'quiz-card__prompt',
            mode === 'flag' && 'quiz-card__prompt--flag',
          )}
        >
          {current.prompt}
        </div>

        <div className="quiz-choices">
          {current.choices.map((id) => {
            const choice = countries.find((c) => c.id === id)
            if (!choice) return null

            const isAnswer = id === current.answerId
            const isPicked = id === selected
            const state = answered
              ? isAnswer
                ? 'is-correct'
                : isPicked
                  ? 'is-wrong'
                  : 'is-dim'
              : undefined

            return (
              <button
                key={id}
                type="button"
                className={cx('quiz-choice', state)}
                disabled={answered}
                onClick={() => choose(id)}
              >
                <span className="quiz-choice__flag" aria-hidden="true">
                  {choice.flag}
                </span>
                <span>{choice.name}</span>
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="quiz-feedback">
            <span
              className={
                selected === current.answerId
                  ? 'quiz-feedback__correct'
                  : 'quiz-feedback__wrong'
              }
            >
              {selected === current.answerId
                ? 'Correct!'
                : `Not quite — it’s ${answerCountry?.name ?? 'unknown'}.`}
            </span>
            <button type="button" className="btn btn--primary" onClick={next}>
              {index + 1 >= questions.length ? 'See results' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}