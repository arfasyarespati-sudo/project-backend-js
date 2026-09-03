async function findUser(username){
try {
    const URL = 'https://api.github.com/users/' + username;
    const response = await fetch(URL);

    if (!response.ok) {
        console.log('could not fetch data')
        return;
    }
    const data = await response.json();
        console.log("\n=================================");
        console.log(`Name           : ${data.name || 'Tidak ada nama'}`);
        console.log(`Bio            : ${data.bio || 'Tidak ada bio'}`);
        console.log(`Followers      : ${data.followers}`);
        console.log(`Public Repos   : ${data.public_repos}`);
        console.log("=================================\n");

    } catch(error) {
        console.log(error);
    }
}

findUser('arfasyarespati-sudo');