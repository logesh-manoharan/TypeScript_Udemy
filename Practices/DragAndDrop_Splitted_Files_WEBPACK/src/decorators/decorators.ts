// Autobind Decorator
export function Autobind (_target: any, _methodName: any, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configure: true,
        get () {
            const boundFunc = originalMethod.bind(this);
            return boundFunc;
        }
    }
    return adjDescriptor;
}