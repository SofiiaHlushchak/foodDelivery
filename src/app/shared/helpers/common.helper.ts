export class CommonHelper {
  static removeBlankAttributes(
    obj: Record<string, string | number | boolean | string[] | null | undefined>
  ): Record<string, string | number> {
    return Object.entries(obj)
      .filter(([_, value]) => value != null && value !== '')
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Array.isArray(value)
            ? value.join(',')
            : value === true || value === false
              ? value.toString()
              : value,
        }),
        {}
      );
  }
}
