export default function request<T extends Object>(constructor: T, key: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value as Function;
    const overrideMethod = async function() {
        try {
            await method();
        } catch(e) {
            console.error(e);
        }
    }

    return {
        ...descriptor,
        value: overrideMethod
    };
}
