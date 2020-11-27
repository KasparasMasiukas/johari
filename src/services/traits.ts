const traitsLT_male = [
    'Artimas',
    'Atviras',
    'Drovus',
    'Šiltas',
    'Mielas',
    'Linksmas',
    'Taikus',
    'Ryžtingas',
    'Atkaklus',
    'Drąsus',
    'Išsigandęs',
    'Žavus',
    'Išdidus',
    'Ramus',
    'Nusiminęs',
    'Pašėlęs',
    'Lėtas',
    'Abejingas',
    'Liūdnas',
    'Globojantis',
    'Užsispyręs',
    'Užjaučiantis',
    'Stiprus',
    'Žingeidus',
    'Suirzęs',
    'Draugiškas',
    'Padedantis',
    'Darbštus',
    'Išsiblaškęs',
    'Sąmojingas',
    'Jausmingas',
    'Uždaras',
    'Pavydus',
    'Džiaugsmingas',
    'Džiugus',
    'Tiesus',
    'Apsimiegojęs',
    'Taktiškas',
    'Nuoširdus',
    'Dėkingas',
    'Nenustygstantis vietoje',
    'Atsakingas',
    'Pavargęs',
    'Užsisklendęs',
    'Dosnus',
    'Patikimas',
    'Tobulėjantis',
    'Narsus',
    'Santūrus',
    'Pritariantis',
    'Klystantis'
];

const traitsLT_female = [
    'Artimas',
    'Atviras',
    'Drovus',
    'Šiltas',
    'Mielas',
    'Linksmas',
    'Taikus',
    'Ryžtingas',
    'Atkaklus',
    'Drąsus',
    'Išsigandęs',
    'Žavus',
    'Išdidus',
    'Ramus',
    'Nusiminęs',
    'Pašėlęs',
    'Lėtas',
    'Abejingas',
    'Liūdnas',
    'Globojantis',
    'Užsispyręs',
    'Užjaučiantis',
    'Stiprus',
    'Žingeidus',
    'Suirzęs',
    'Draugiškas',
    'Padedantis',
    'Darbštus',
    'Išsiblaškęs',
    'Sąmojingas',
    'Jausmingas',
    'Uždaras',
    'Pavydus',
    'Džiaugsmingas',
    'Džiugus',
    'Tiesus',
    'Apsimiegojęs',
    'Taktiškas',
    'Nuoširdus',
    'Dėkingas',
    'Nenustygstantis vietoje',
    'Atsakingas',
    'Pavargęs',
    'Užsisklendęs',
    'Dosnus',
    'Patikimas',
    'Tobulėjantis',
    'Narsus',
    'Santūrus',
    'Pritariantis',
    'Klystantis'
];

export default function getTraits(gender: 'male' | 'female') : string[] {
    if (gender === 'male')
        return traitsLT_male;
    else return traitsLT_female;
}