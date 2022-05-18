const React = require('react')
const Default = require('./layouts/default')

function Show({ bread }) {
    return(
        <Default>
            <h2>Show Page</h2>
            <h3>{bread.name}</h3>
            <p>
                and it { bread.hasGluten ? <span> does </span> : <span> does NOT </span> } <span>have gluten.</span>
            </p>
            <img src={bread.image} alt={bread.name}></img>
        </Default>
    )
}

module.exports = Show