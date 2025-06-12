import React from 'react'
import CreateTeamForm from './CreateTeamForm'

interface Props {}

function CreateTeamSection(props: Props) {
    const {} = props

    return (
        <div>
            <div><CreateTeamForm/></div>
            <div>Add members ...</div>
        </div>
    )
}

export default CreateTeamSection
