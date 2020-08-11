class Factory {
	public constructor() {
	}
	static create<T>(type: (new () => T)): T {
        return new type();
    }

}