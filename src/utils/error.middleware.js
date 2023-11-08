import Errors from "./ErrorsEnum.js";

export default (error, req, res) => {
    console.log(error.cause)
    switch(error.code) {
        case Errors.AUTH_ERROR:
            res.status(500).send({ status: 'error', error: error.name, cause: error.cause });
            break
        // default:
        //     res.status(500).send({ status: true, error: 'Unhandled error' })
    }
}