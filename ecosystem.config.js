module.exports = {
    apps: [
        {
            name: 'wg',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            // instances: 1, // Or a number of instances
            script: '.output/server/index.mjs',
            args: 'start',
            port: '3000',
            time: true
        }
    ]
}