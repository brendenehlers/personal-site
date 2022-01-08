// fill recommendations
const recommendations = [
  {id: '1', text: 'Something good about the business here'},
  {id: '2', text: 'Another thing about the business here'},
  {id: '3', text: 'A third good thing'},
]
const recsElem = document.getElementById('recs-row')
recommendations.forEach((rec, i, arr) => {
  if (i < 4) recsElem.innerHTML += `
    <div 
      class='
        border
        bg-white 
        p-3 
        m-2 
        w-25
        rounded
        text-center
        text-black
      '
      id='recs-row-${rec.id}'><span>${rec.text}</span></div>
  `
})

// fill previous projects
const projects = [
  {title: 'Project 1', description: 'asdkfjhasdjfkhalsdkjfhalskjdhflkjashfkljahsdkljashdflkjhasdkljhfaksjldhaskljdfhlkjasdhflkjasdhflkjasdhfkajsdhfkjadshlfjkkjlahdfhjkaslaksdjfhladsjkhasdljkasdhflkjasdhkljhfadslkjhfjkasdhfaksjdhfkjadshfkljasdhkljfasdhljkasdhfl', imgUrl: './images/project1.jpg', url: 'https://google.com'},
  {title: 'Project 1', description: 'project 1', imgUrl: './images/project1.jpg', url: 'https://google.com'},
  {title: 'Project 1', description: 'project 1', imgUrl: './images/project1.jpg', url: 'https://google.com'},
  {title: 'Project 2', description: 'project 2', imgUrl: './images/project2.jpg', url: 'https://yahoo.com'},
  {title: 'Project 2', description: 'project 2', imgUrl: './images/project2.jpg', url: 'https://yahoo.com'},
  {title: 'Project 2', description: 'project 2', imgUrl: './images/project2.jpg', url: 'https://yahoo.com'},
]

function createCard(cardContents) {
  return `
  <div class='card d-flex text-black pb-1 w-25' style='height: 28rem; overflow: hidden;'>
    <img src='${cardContents.imgUrl}' class='card-img-top' alt="Picture of ${cardContents.title}'s website">
    <div class='card-body py-1'>
      <h4 class='card-title'>${cardContents.title}</h4>
      <p class='card-text' style='height: 50%; overflow: hidden;'>${cardContents.description}</p>
      <div class='py-1' style='height: 5%; background: white;'></div>
      <a href='${cardContents.url}' target='_blank' class='btn btn-primary' style='position: absolute; bottom: 0; left: 0; width: 100%;' rel='noreferrer noopener'>Visit (opens new tab)</a>
    </div>
  </div>
  `
}
const projectsElem = document.getElementById('projects')
if (projectsElem) {
  for (let i = 0; i < Math.floor(projects.length/3); i++) {
    let caroselItem = `<div class='carousel-item ${ i === 0 ? 'active' : ''}'><div class=' d-flex justify-content-evenly'>`
    for (let j = 0; j < 3; j++) { 
      caroselItem += createCard(projects[3*i+j])
    }
    caroselItem += '</div></div>'
    projectsElem.innerHTML += caroselItem
  }
}