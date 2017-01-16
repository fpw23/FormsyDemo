import React from 'react';
import * as Tools from "../Tools";
import _ from 'lodash';
import Controls from '../Controls';
import JSONPretty from 'react-json-pretty';

const DemoPage1 = React.createClass({

    frm: undefined,
    getInitialState() {
        return {
            formData: {}
        };
    },
    getListData() {

        return [
            { Id: 'A', DisplayName: 'Option A' },
            { Id: 'B', DisplayName: 'Option B' },
            { Id: 'C', DisplayName: 'Option C' },
            { Id: 'D', DisplayName: 'Option D' },
            { Id: 'E', DisplayName: 'Option E' },
            { Id: 'F', DisplayName: 'Option F' }
        ];

    },
    onClick() {
        this.refs.frm.submit();
    },
    onSubmit(model, reset, invalidate) {

        this.setState({
            formData: model
        });
    },

    render() {
        return (
		 		<div>
                <Controls.PageTitle Title="Forms Demo" SubTitle="Demo of all form controls"></Controls.PageTitle>
                <Controls.Formsy.Form ref={(input) => { this.frm = input; }} onValidSubmit={this.onSubmit}>
                    <h2>Single Value Controls</h2>
                    <Controls.BootRow>
                        <Controls.BootCol Size={4}>
                            <Controls.TextBox name="TextBox" label="Text Box" value=""></Controls.TextBox>
                            <p>Simple text box</p>
                        </Controls.BootCol>
                        <Controls.BootCol Size={4}>
                            <Controls.NumberBox name="NumberBox" label="Number Box" value="" ></Controls.NumberBox>
                            <p>A text box that only allows numbers. Is wrapping the <a href="https://github.com/hongymagic/react-number-input">react-number-input</a> project.</p>
                        </Controls.BootCol>
                        <Controls.BootCol Size={4}>
                            <Controls.StaticBox name="StaticBox" label="Static Box" value="My read only value"></Controls.StaticBox>
                            <p>A box that show the value as read only</p>
                        </Controls.BootCol>
                    </Controls.BootRow>
                    <Controls.BootRow>
                        <Controls.BootCol Size={4}>
                            <Controls.TextMaskedBox name="TextMaskedBox" helpText="Mask is set to 1111 1111 1111 1111 to validate a credit card." label="Text Masked Box" value="" mask="1111 1111 1111 1111"></Controls.TextMaskedBox>
                            <p>A text box with a mask.  Is wrapping the <a href="https://github.com/insin/react-maskedinput">react-maskedinput</a> project.</p>
                        </Controls.BootCol>
                        <Controls.BootCol Size={4}>
                            <Controls.DateBox name="DateBox" label="Date Box" value="" ></Controls.DateBox>
                            <p>A date only box with calendar selection. Is wrapping the <a href="https://github.com/Hacker0x01/react-datepicker">react-datepicker</a> project.</p>
                        </Controls.BootCol>
                        <Controls.BootCol Size={4}>
                            <Controls.DateTimeBox name="DateTimeBox" label="Date Time Box" ></Controls.DateTimeBox>
                            <p>A date time box with drop down selection. Is wrapping the <a href="https://github.com/Hacker0x01/react-datepicker">react-datepicker</a> project and adding a custom time dropdown.</p>
                        </Controls.BootCol>
                    </Controls.BootRow>
                    <Controls.BootRow>
                        <Controls.BootCol Size={4}>
                            <Controls.ComboBox name="ComboBox" label="Combo Box" value="UTC" options={this.getListData()} textProp="DisplayName" valueProp="Id" ></Controls.ComboBox>
                            <p>A select box with options.  This example is using a list of time zones as the option data.</p>
                        </Controls.BootCol>
                           <Controls.BootCol Size={4}>
                            <Controls.RadioGroupBox name="RadioGroupBox" label="Radio Group Box" value={[]} options={[{ label: 'option 1', value: '1'}, {label: 'option 2', value: '2'},{ label: 'option 3', value: '3' }]}></Controls.RadioGroupBox>
                            <p>A radio group box. Is wrapping the <a href="https://github.com/chenglou/react-radio-group">react-radio-group</a> project.</p>
                           </Controls.BootCol>
                         <Controls.BootCol Size={4}>
                            <Controls.RadioGroupBox name="RadioGroupBoxInline" showInline={true} label="Radio Group Box (inline)" value={[]} options={[{ label: 'option 1', value: '1'}, {label: 'option 2', value: '2'},{ label: 'option 3', value: '3' }]}></Controls.RadioGroupBox>
                            <p>With the inline option set to true.</p>
                         </Controls.BootCol>
                    </Controls.BootRow>
                    <h2>Multiple Value Controls</h2>
                    <Controls.BootRow>
                        <Controls.BootCol Size={12}>
                            <Controls.MultiBox name="MultiBox" label="Multi Box" value={[]} availableOptions={this.getListData()} textProp="DisplayName" valueProp="Id" ></Controls.MultiBox>
                            <p>A multiple choice box with left/right options.</p>                        </Controls.BootCol>
                    </Controls.BootRow>
                    <Controls.BootRow>
                        <Controls.BootCol Size={6}>
                            <Controls.CheckGroupBox name="CheckGroupBox" label="Check Group Box" value={[]} options={[{ label: 'option 1', value: '1'}, {label: 'option 2', value: '2'},{ label: 'option 3', value: '3' }]}></Controls.CheckGroupBox>
                            <p>A check group box. Is wrapping the <a href="https://github.com/ziad-saab/react-checkbox-group">react-checkbox-group</a> project.</p>                        </Controls.BootCol>
                         <Controls.BootCol Size={6}>
                            <Controls.CheckGroupBox name="CheckGroupBoxInline" showInline={true} label="Check Group Box (inline)" value={[]} options={[{ label: 'option 1', value: '1'}, {label: 'option 2', value: '2'},{ label: 'option 3', value: '3' }]}></Controls.CheckGroupBox>
                            <p>With the inline option set to true.</p>
                         </Controls.BootCol>
                    </Controls.BootRow>
                    <Controls.BootRow>
                        <Controls.BootCol Size={12}>
                            <Controls.BootButton text="Submit" type="success" onClick={this.onClick}></Controls.BootButton>
                        </Controls.BootCol>
                    </Controls.BootRow>
                </Controls.Formsy.Form>
                {_.isEmpty(this.state.formData) == true ? 
                <span></span> :
                <div>
                    <Controls.PageTitle Title="Form Data" SubTitle="the data collected from the form"></Controls.PageTitle>
                    <JSONPretty id="json-pretty" json={this.state.formData}></JSONPretty>
                </div>
                }
            </div>
		 );
    }
});

export default DemoPage1;