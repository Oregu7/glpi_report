const { getItilsolutions } = require("./db");
const workRegexp = /\d{2}\.\d{2}\.\d{4}/g;

async function main() {
    const itilsolutions = await getItilsolutions();
    console.log(itilsolutions);
}

main()
    .catch(console.error);