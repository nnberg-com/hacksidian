"""Run the CLI with python -m atlas_generator."""
try:
    from .build import main
except ModuleNotFoundError as exc:
    raise SystemExit(
        f'Missing dependency {exc.name}. '
        'Install: python3 -m pip install -r atlas_generator/requirements.txt'
    ) from exc

if __name__ == '__main__':
    raise SystemExit(main())
