/* storage node for back door using */
const StorageData = (() => {
    let storage = {};
    const list = () => {
        return storage;
    };
    const set = (name, value) => {
        storage[name] = value;
        return storage;
    };
    const get = (name) => {
        return storage[name];
    };
    const has = (name) => {
        return ('undefined' ==  typeof storage[name])? false: true;
    };
    const del = (name) => {
        if('undefined' !=  typeof storage[name])
        {
            delete storage[name]
        }
        return storage;
    };
    const clean = () => {
        storage = {};
        return storage;
    };
    return {
        list: list,
        set: set,
        get: get,
        has: has,
        del: del,
        clean: clean
    };
})();
export default StorageData;