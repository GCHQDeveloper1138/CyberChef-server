import { OperationError, DishError } from "cyberchef";


/**
 * errorHandler
 *
 * Handle any errors that fall through the application. Lives at the end
 * of the function chain.
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    if (
        err instanceof TypeError ||
        err instanceof OperationError ||
        err instanceof DishError
    ) {
        res.status(400).send(err.message).end();
    } else {
        req.log.error(err.stack);
        res.status(500).send("Internal Server Error").end();
    }
}
