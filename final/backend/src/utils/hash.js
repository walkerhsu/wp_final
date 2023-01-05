import jsSHA from"jssha"

const hash = (str, salt) => {
    const shaObj = new jsSHA("SHA-256", "TEXT")
    shaObj.update(str+salt)
    // console.log(shaObj.getHash("HEX"))
    return shaObj.getHash("HEX")
}

export default hash