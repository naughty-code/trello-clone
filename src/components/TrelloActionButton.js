import React from "react";
import { Icon,  Card, Button } from "@material-ui/core";
import Textarea from 'react-textarea-autosize';
import { connect } from "react-redux";
import { addList, addCard } from "../actions"

class TrelloActionButton extends React.Component {

    state = {
        formOpen: false,
        text: ""
    }

    renderAddButton = () => {
        const {list} = this.props;
        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";
        return (
            <div
                onClick={this.openForm} 
                style={{
                ...style.openFormButtonGroup,
                opacity: buttonTextOpacity,
                color: buttonTextColor,
                backgroundColor: buttonTextBackground,
            }}>
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </div>
        );
    };

    closeForm = (e) => {
        this.setState({
            formOpen: false
        });
    }

    handleInputChange = e =>{
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props;
        const { text } = this.state;
        if(text){
            this.setState((state) => ({...this.state, text: ""}));
            dispatch(addList(text));
        }
        return;
    }
    handleAddCard = () =>{
        const { dispatch, listID } = this.props;
        const { text } = this.state;
        if (text){
            this.setState((state) => ({...this.state, text: ""}));
            dispatch(addCard(listID, text));
        }
    }
    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ?  "Enter list title..." : "Enter a title for this card...";
        const buttonTitle = list ? "Add List" : "Add Card";
        return (
            <div>
                <Card style={{
                    overflow: "hidden",
                    minHeight: 80,
                    minWidth: 272,
                    padding: "6 px 8px 2px"
                }}>
                    <Textarea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={
                            {
                                resize: "none",
                                width: "100%",
                                outline: "none",
                                border: "none",
                                overflow: "hidden"
                            }
                        }
                    />
                </Card>            
                <div style={style.formButtonGroup}>
                    {/* here is very important to use OnMouseDown instead of onClick because onMouseDown fires before Textarea.onBlur that would unload the component before the onclick event rises*/} 
                    <Button onMouseDown={list ? this.handleAddList : this.handleAddCard} variant="contained" style={{color: "white", backgroundColor: "#5aac44"}}>
                        {buttonTitle}{" "}
                    </Button>
                    <Icon style={{ marginLeft: 8, cursor: "pointer"}}>close</Icon>
                </div>
            </div>
        ); 
    }

    openForm = () => {
        this.setState({
            formOpen: true
        })
    }

    render(){
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const style = {
    openFormButtonGroup: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10
    },
    formButtonGroup: {
        marginTop: 8,
        display: "flex",
        alignItems: "center"
    }
};

export default connect()(TrelloActionButton);