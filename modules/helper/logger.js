function message(message, sender) {
    if (sender) {
        console.log(`[Info] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${message}`);
        return;
    }
    console.log(`[Info] ${new Date().toLocaleTimeString()}: ${message}`);
}

function error(errormessage, sender, level) {
    switch (level) {
        case 1:
            if (sender) {
                console.log(`[Error] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${errormessage}`);
                return;
            }
            console.log(`[Error] ${new Date().toLocaleTimeString()}: ${errormessage}`);
            break;
        case 2:
            if (sender) {
                console.log(`   [Error] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${errormessage}`);
                return;
            }
            console.log(`   [Error] ${new Date().toLocaleTimeString()}: ${errormessage}`);
            break;
        case 3:
            if (sender) {
                console.log(`\n\n[Error] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${errormessage}\n\n`);
                return;
            }
            console.log(`[Error] ${new Date().toLocaleTimeString()}: ${errormessage}`);
            break;
        default:
            if (sender) {
                console.log(`[Error] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${errormessage}`);
                return;
            }
            console.log(`[Error] ${new Date().toLocaleTimeString()}: ${errormessage}`);
            break;
    }

}

function warning(warnmessage, sender) {
    if (sender) {
        console.log(`[Warning] ${new Date().toLocaleTimeString()}: ${warnmessage}`);
        return;
    }
    console.log(`[Warning] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${warnmessage}`);
}

function info(message, sender) {
    if (process.env.DEBUG) {
        if (sender) {
            console.log(`[Info] ${ '[' + sender + ']' } ${new Date().toLocaleTimeString()}: ${message}`);
            return;
        }
        console.log(`[Info] ${new Date().toLocaleTimeString()}: ${message}`);
    }
}

module.exports = {
    message,
    error,
    warning,
    info
}
