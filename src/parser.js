import fs from 'fs';

const parse = (generatedPath) => {
if (generatedPath.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(generatedPath), 'utf-8');
    return data;
}
}
export default parse