import { useEffect, useState } from 'react'
import { useUserStore } from '../store/useUserStore'

interface Props {
  countryId: string
  countryName: string
}

export default function NoteEditor({ countryId, countryName }: Props) {
  const note = useUserStore((s) => s.notes[countryId] ?? '')
  const setNote = useUserStore((s) => s.setNote)

  const [draft, setDraft] = useState(note)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setDraft(note)
  }, [countryId, note])

  function save() {
    setNote(countryId, draft)
    setJustSaved(true)
    window.setTimeout(() => setJustSaved(false), 1500)
  }

  const dirty = draft !== note

  return (
    <div className="note-editor">
      <label htmlFor={`note-${countryId}`}>Your notes on {countryName}</label>
      <textarea
        id={`note-${countryId}`}
        value={draft}
        rows={4}
        placeholder="What do you want to remember about this place?"
        onChange={(e) => setDraft(e.target.value)}
      />
      <div className="note-editor__actions">
        <button
          type="button"
          className="btn btn--primary"
          onClick={save}
          disabled={!dirty}
        >
          {note ? 'Update note' : 'Save note'}
        </button>
        {justSaved && <span className="note-editor__saved">Saved</span>}
      </div>
    </div>
  )
}