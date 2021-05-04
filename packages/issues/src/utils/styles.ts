export const compare = (expected, actual) =>
    Object.keys(expected).every((key) => {
        const ao = actual[key];
        const eo = expected[key];

        return ao === eo;
    });

export const is = (predicate: Record<string, unknown>, styles: string) => (props: Record<string, unknown>) =>
    compare(predicate, props) ? styles : null;
