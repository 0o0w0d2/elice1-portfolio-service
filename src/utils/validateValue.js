// 값을 제대로 받았는지 체크하는 기능
// 객체를 받는다
function validateValue(values) {
    Object.values(values).map((item, index)=>{
        if (!item) {
            throw new Error(`CHECK ${Object.keys(values)[index]}`);
        };
    });
    return;
}

export default validateValue;