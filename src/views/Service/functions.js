export let onlyAdminCreateUsers = (a) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (a) {
                res(a);
            }
            else {
                rej('i have error');
            }
        }, 1000);
    });
}