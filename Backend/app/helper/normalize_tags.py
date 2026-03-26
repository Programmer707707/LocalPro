def normalize_tag(value: str | None) -> str | None:
    if value is None:
        return None
    cleaned = value.strip().lstrip('@')
    return cleaned

