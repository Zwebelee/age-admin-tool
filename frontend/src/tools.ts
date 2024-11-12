const tools = {

    addSeparators: (number: string) => {
        number = "" + number;
        if (number.length > 3) {
            const mod = number.length % 3;
            let output = (mod > 0 ? (number.substring(0, mod)) : "");
            for (let i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod === 0) && (i === 0)) {
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                } else {
                    output += "’" + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
            }
            return (output);
        } else {
            return number;
        }
    },

}

export { tools };