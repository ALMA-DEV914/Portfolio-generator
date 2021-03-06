
const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
const {writeFile, copyFile} = require('./utils/generate-site.js');
//const profileDataArgs = process.argv.slice(2);
//const name =profileDataArgs[0];
//const github = profileDataArgs[1];
 //const [name, github] = profileDataArgs;
//const pageHTML = generatePage(name, github);

//console.log(name, github);
//console.log (generatePage(name, github));
//fs.writeFile('index.html', pageHTML, err => {
   // if(err) throw new Error(err);
    //console.log('Portfolio complete! Check out index.html to see the output!');
//});
const promtUser = () => {
 return inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if(nameInput){
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username. (Required)',
        validate: githubInput => {
            if(githubInput){
                return true;
            } else {
                console.log("Please enter your Github username!");
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) => {
            if(confirmAbout){
                return true;
            } else {
                return false;
            }
        }
    }

]);
};
//promtUser().then(answers => console.log(answers));

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New project
    =================
    `);
    // if there's no projects array property, create one
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }
    return inquirer.prompt([
       {
           type: 'input',
           name: 'name',
           message: 'What is the name of your project?',
           validate: nameInput => {
               if (nameInput){
                   return true;
               } else {
                   console.log ('Please enter your Project name!');
                   return false;
               }
            }
       },
       {
           type: 'input',
           name: 'description',
           message: 'provide the description of your project(Required)',
           validate: descriptionInput => {
               if(descriptionInput){
                   return true;
               } else {
                   console.log("Please enter your project description!");
                   return false;
               }
           }
       },
       {
           type: 'checkbox',
           name: 'languages',
           message: 'What did you build this project with? ( Check all that apply)', 
           choices: ['Javascript', 'HTML', 'Bootstrap', 'JQuery', 'Node']
       },
       {
           type: 'input',
           name: 'link',
           message: 'Enter the Github link to your project. (Required)',
           validate: linkInput => {
               if(linkInput){
                   return true;
               } else {
                   console.log("Please enter your Github link!");
                   return false;
               }
           }
       },
       {
           type: 'confirm',
           name: 'confirmAddProject',
           message: 'Would you like to enter another project?',
           default: false
       },
       
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
};


promtUser()
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
/*
//.then(answers => console.log(answers))
.then(promptProject)
//.then(projectAnswers => console.log(projectAnswers))
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile('./dist/index.html', pageHTML, err => {
       if(err) {
           console.log(err);
           return;
       }
       console.log("Page created! Check out index.html in this directory to see it!");
       fs.copyFile('./src/style.css', './dist/style.css', err => {
            if(err){
                console.log(err);
                return;
            }
            console.log ('Style sheet copied successfully');
       });
    });
    //console.log(portfolioData);
    //portfolioData.projects.push(projectData);
   // if(projectData.confirmAddProject){
      //  return promptProject(portfolioData);
   // } else {
      //  return portfolioData;
    //}
});
*/
