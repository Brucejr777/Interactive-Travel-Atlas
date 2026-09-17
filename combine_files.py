import os
import sys

def combine_files(directory, output_file, exclude_dirs=None, exclude_exts=None):
    if exclude_dirs is None:
        exclude_dirs = {'.git', '__pycache__', 'node_modules', '.venv', 'venv', 'env', 'dist', 'build'}
    if exclude_exts is None:
        exclude_exts = {'.pyc', '.pyo', '.pyd', '.so', '.dll', '.exe', '.bin', '.obj', '.o', '.a', '.lib', '.jar', '.war', '.ear', '.class'}

    with open(output_file, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in exclude_exts:
                    continue
                
                filepath = os.path.join(root, file)
                relpath = os.path.relpath(filepath, directory)
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    continue
                
                out.write(f'=== {relpath} ===\n')
                out.write(content)
                out.write('\n\n')

if __name__ == '__main__':
    directory = sys.argv[1] if len(sys.argv) > 1 else '.'
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'context.txt'
    combine_files(directory, output_file)
    print(f'Combined files written to {output_file}')
