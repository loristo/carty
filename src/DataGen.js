import { AES } from 'crypto-js';

const cities = ['Paris', 'Issy-Les-Moulineaux', 'Aubervilliers', 'Vanves'];

const streetNames = ['Rue de la Paix', 'Rue Victor Hugo',
    'Rue Pierre Brossolette', 'Rue du Commerce',
    'Avenue de la Grande Armée', 'Rue Charles de Gaulle',
    'Boulevard Louis Pasteur', 'Avenue Jean Jaurès', 'Rue Jean Moulin',
    'Rue Léon Gambetta', 'Avenue du Général Leclerc', 'Rue Jules Ferry',
    'Place du Maréchal Foch', 'Rue Georges Clémenceau',
    'Rue de l\'Église', 'Place de l\'Église', 'Grande Rue',
    'Rue du Moulin', 'Place de la Mairie', 'Rue du Château',
    'Rue des Écoles', 'Rue de la Gare', 'Rue de la Mairie',
    'Rue Principale', 'Rue du Stade', 'Rue du Stade', 'Rue de la Fontaine',
    'Rue Pasteur', 'Rue des Jardins', 'Rue du Quatre-Septembre',
    'Rue du Quatorze-Juillet', 'Rue du Onze-Novembre',
    'Rue du Dix-Neuf-Mars', 'Rue du Huit-Mai'];

const home = {
    city: cities[1],
    street: streetNames[4],
    number: 12,
};

const work = {
    city: cities[0],
    street: streetNames[8],
    number: 4,
};

const goToWorkTime = new Date(0, 0, 0, 8, 45, 0);
const backFromWorkTime = new Date(0, 0, 0, 18, 0, 0);
const timeHomeToWork = 15

const hideout = {
    city: cities[3],
    street: streetNames[17],
    number: 23,
};

const timeWorkToHideout = 30
const timeHideoutToHome = 40

const startDate = new Date(2020, 9, 19); // 19/10/2020
const endDate = new Date(2020, 11, 21); // 21/12/2020

function rand(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = rand(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

function addTime(date, time) {
    const res = new Date(date);
    res.setMinutes(res.getMinutes() + time.getMinutes());
    res.setHours(res.getHours() + time.getHours());
    return res;
}

function randomPlaces(nbPlaces, tab, startTime) {
    if (!nbPlaces) return;
    ++nbPlaces; // in order to come back home
    let city, street, number, time, way, dst;
    let previous = null; // previous location
    const remaining = (23 - startTime.getHours()) * 60;
    for (let i = 0; i < nbPlaces - 1; ++i)
    {
        city = cities[Math.round(rand(-0.49, cities.length, 1.5))];
        street = streetNames[Math.round(Math.random() * streetNames.length)];
        number = Math.round(Math.random() * 50);
        time = Math.round(rand(0, remaining / nbPlaces, 1));
        way = Math.round(rand(0, 35 < time ? 35 : time, 1));
        dst = {
            city: city,
            street: street,
            number: number,
        };
        tab.push({
            startTime: new Date(startTime),
            endTime: addTime(startTime, new Date(0, 0, 0, 0, way)),
            time: way,
            src: previous || home,
            dst: dst,
            alias: 'Autre',
            recurring: false
        });
        previous = dst;
        startTime.setMinutes(startTime.getMinutes() + time);
    }
    way = Math.round(rand(0, 60, 1));
    tab.push({
        startTime: new Date(startTime),
        endTime: addTime(startTime, new Date(0, 0, 0, 0, way)),
        time: way,
        src: previous,
        dst: home,
        alias: 'Maison',
        recurring: false
    });

}

function AddressGenerator() {
    const res = [];
    const nbDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    let startTime, time, endTime;

    for (let i = 0; i < nbDays; ++i, startDate.setDate(startDate.getDate() + 1))
    {
        if (i % 7 >= 5) // weekends
        {
            const nbPlaces = Math.round(rand(0, 4, 1));
            randomPlaces(nbPlaces, res, addTime(startDate, new Date(0, 0, 0, 8,
                rand(0, 120, 1), 0, 0)));
        }
        else // week days
        {
            // Going to Work
            startTime = addTime(startDate, goToWorkTime);
            startTime.setMinutes(startTime.getMinutes()
                + Math.round(rand(-10, 10, 1)))
            time = timeHomeToWork + Math.round(rand(-5, 5, 1));
            endTime = new Date(startTime);
            endTime.setMinutes(startTime.getMinutes() + time);
            res.push({
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                time: time,
                src: home,
                dst: work,
                alias: 'Travail',
                recurring: true
            });

            if (i > nbDays / 2) // Fraudulous activity
            {
                // Going to the hideout
                startTime = addTime(startDate, backFromWorkTime);
                startTime.setMinutes(backFromWorkTime.getMinutes()
                    + Math.round(rand(-30, 30, 1)))
                time = timeWorkToHideout + Math.round(rand(-15, 15, 1));
                endTime = new Date(startTime);
                endTime.setMinutes(startTime.getMinutes() + time);
                res.push({
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    time: time,
                    src: work,
                    dst: hideout,
                    alias: 'Autre',
                    recurring: true
                });

                // Going back home
                startTime = new Date(endTime);
                startTime.setMinutes(startTime.getMinutes()
                    + Math.round(rand(45, 120, 1)))
                time = timeHideoutToHome + Math.round(rand(-5, 5, 1));
                endTime = new Date(startTime);
                endTime.setMinutes(startTime.getMinutes() + time);
                res.push({
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    time: time,
                    src: hideout,
                    dst: home,
                    alias: 'Maison',
                    recurring: true
                });
            }
            else
            {
                // Going back home
                startTime = addTime(startDate, backFromWorkTime);
                startTime.setMinutes(backFromWorkTime.getMinutes()
                    + Math.round(rand(-30, 30, 1)))
                time = timeHomeToWork + Math.round(rand(-15, 15, 1));
                endTime = new Date(startTime);
                endTime.setMinutes(startTime.getMinutes() + time);
                res.push({
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    time: time,
                    src: work,
                    dst: home,
                    alias: 'Maison',
                    recurring: true
                });
                const nbPlaces = Math.round(rand(0, 2, 2.5));
                randomPlaces(nbPlaces, res, addTime(endTime,
                    new Date(0, 0, 0, 0, rand(0, 60, 1), 0, 0)));
            }
        }
    }
    return res;
}

const pass = decodeURIComponent('rJcTLptmjFKMEAB9m76PIurjIuZcakdyvB990QZWLl4%3D');
const data = JSON.stringify(AddressGenerator());
const crypted = AES.encrypt(data, pass).toString();

export { crypted };
