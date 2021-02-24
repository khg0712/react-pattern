export function request<T extends Object>(constructor: T, key: string, descriptor: PropertyDescriptor) {
    console.log(constructor);
    console.log(key);
    console.log(descriptor);

    const apiAction = async function() {
        
    }
}

