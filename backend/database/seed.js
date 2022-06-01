const User = require('../models/User');
const Task = require('../models/Task');
const Msg = require('../models/Msg');

(async () => {

    await User.create({
        userName: 'admin',
        email: 'admin@admin.se',
        password: 'admin',
        role: 'admin'
    });
    await User.create({
        userName: 'worker',
        email: 'worker@worker.se',
        password: 'worker',
        role: 'worker'
    });
    await User.create({
        userName: 'client',
        email: 'client@client.se',
        password: 'client',
        role: 'client'
    });
    })();