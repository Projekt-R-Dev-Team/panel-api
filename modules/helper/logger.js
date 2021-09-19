function message(message) {
    console.log(`[Info] ${new Date().toLocaleTimeString()}: ${message}`);
}

function error(errormessage, level) {
    if (level === 3) {
        console.log(`\n\n[Error] ${new Date().toLocaleTimeString()}: ${errormessage}\n\n`);
    } else {
        console.log(`[Error] ${new Date().toLocaleTimeString()}: ${errormessage}`);
    }
    
}

function warning(warnmessage) {
    console.log(`[Warning] ${new Date().toLocaleTimeString()}: ${errormessage}`);
}

module.exports = {
    message,
    error,
    warning
}