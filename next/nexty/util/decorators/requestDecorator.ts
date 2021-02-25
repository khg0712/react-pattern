type AsyncFunction = (...args: any) => Promise<any>
export default function request<T extends AsyncFunction>(constructor: Object, key: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | undefined {
    const method = descriptor.value as AsyncFunction;
    const overrideMethod = async function (this: any, ...args: any) {
        try {
            const result = await method.apply(this, args);
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    return {
        ...descriptor,
        value: overrideMethod as T
    };
}
