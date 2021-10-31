export function Controller(path: string = '/') {
    return function(target: any) {
        Object.defineProperty(target, 'path', { value: path });  
    }
}