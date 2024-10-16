const formatAda = (value: string | number) => {
    return `₳${Math.floor(Number(value) / 1e6).toLocaleString()}`;
};

export default formatAda;
