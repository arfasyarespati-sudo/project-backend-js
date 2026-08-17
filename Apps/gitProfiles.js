async function findUser(username) {
try {
    const URL = "https://api.github.com/users/" + username;
    const response = await fetch(URL);
        if (!response.ok) {
        console.log('could not fetch source');
        return;
        }
        const data = await response.json();
        console.log('==========================');
        console.log(`Name       : ${data.name}`);
        console.log(`Bio        : ${data.bio}`);
        console.log(`Followers  : ${data.followers}`);
        console.log(`Public Repo: ${data.public_repos}`);
        console.log('==========================');
    } 
    catch (error) {
        console.log(error);
    }
}
findUser('arfasyarespati-sudo');