import { useEffect, useState } from 'react';

let registeredObjects = []
let value = 0
const subscribe = (f) => {
    registeredObjects.push(f)
    return () => unsubscribe(registeredObjects.filter(a => a != f));
}

const unsubscribe = (subcribes) => subcribes = subcribes;

const onChange = () => {
    registeredObjects.forEach(f => {
        f();
    })
};

export const getValue = () => value

export const setValue = (data) => {
    value = data
    onChange();
}

export const resetValue = () => {
    value = 0
    onChange();
}

export function useValueStore() {
    const [value, setValue] = useState(getValue());
    useEffect(() => {
        const unsubcribes = subscribe(() => {
            setValue(getValue());
        })
        return () => {
            unsubcribes()
        };
    }, []);

    return value;
}