const {url, api_key} = require('./config')
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const http = require('http')

const rl = readline.createInterface({ input, output });
rl.question('Enter city name: ', (answer) => {
    const query = `${url}current?access_key=${api_key}&query=${encodeURI(answer)}`

    http.get(query, (resp) => {
        resp.setEncoding('utf-8')
        let rowData = '',
            weatherDesc = '',
            comma

        resp
            .on('data', chunk => {
                rowData += chunk
            })
            .on('end', () => {
                const parseData = JSON.parse(rowData)
                parseData.current.weather_descriptions.length > 1 ?
                    comma = ', ' : comma = ''
                parseData.current.weather_descriptions.forEach(el => {
                    weatherDesc += el + comma
                });
                console.log(`City: ${parseData.location.name}\nTemperature: ${parseData.current.temperature}\nWeather description: ${weatherDesc}`)
            })
    })

    rl.close()
})


