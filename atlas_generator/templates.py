"""The atlas and plugin consume the same authored CSS, without transformations."""


def atlas_css(directory, read):
    return read(directory / 'recipe.css')
