export function capitalize(input: string) {
    return input
        .split(' ')
        .map(str => str.at(0)?.toUpperCase() + str.slice(1))
        .join(' ')
}