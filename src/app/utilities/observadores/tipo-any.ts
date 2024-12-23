import { Observer } from "rxjs";

export const observadorAny: Observer<any> = {
    next(res){ },
    error(err){ },
    complete() { },
}

