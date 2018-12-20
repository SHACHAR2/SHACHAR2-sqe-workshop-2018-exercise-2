import $ from 'jquery';
import {parseCode} from './code-analyzer';

let tokens=[];
let outPut;
let tabs;
let greenIfs;
let redIfs;
var line;
$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let inputVector = $('#inputPlaceholder').val();
        outPut=[];
        greenIfs=[];
        redIfs=[];
        tokens = parseCode(codeToParse, inputVector);
        outPut= Print(tokens);
        printCodeOnScreen(outPut);
    });
});

function Print(tokens)
{
    tabs=0;
    let outPutt=[];
    let i;
    tokens=sort(tokens);
    let count=0;
    for (i=0; i<tokens.length; i++)
    {
        if(tokens[i].Type!='variable declaration' && tokens[i].Type!='assignment expression' ) {
            if(tokens[i].Type=='for statement') {
                outPutt[count] = printtokenTypes[tokens[i].Type](tokens[i], tokens[i + 1], tokens[i + 2]);
                i=i+2;
                count++;}
            else{
                outPutt[count] = printtokenTypes[tokens[i].Type](tokens[i],count);
                count++;}}
    }
    return outPutt;
}
function printCodeOnScreen(outPut) {

    document.getElementById('container').innerHTML = '';
    for (let i = 0; i < outPut.length; i++) {
        if (greenIfs.includes(i)) {
            line = document.createElement('MARK');
            line.setAttribute('id', 'trueIf');
        }
        else if (redIfs.includes(i)) {
            line = document.createElement('MARK');
            line.setAttribute('id', 'falseIf');
        }
        else {
            line = document.createElement('P');
        }
        var node = document.createTextNode(outPut[i]);
        line.appendChild(node);

        document.getElementById('container').appendChild(line);}
}
let printtokenTypes= {
    'function declaration': PrintFunctionDecleration,
    'while statement':WhileStatement,
    'Block statement':BlockStatement,
    'if statement':IfStatement,
    'else if statement':ElseIfStatement,
    'return statement':ReturnStatement,
    'for statement':ForStatement,
    'else':Else
    //'Do-while statement':DoWhileStatement
};

function PrintFunctionDecleration(code)
{
    let out= 'Function'+ ' '+code.Name;
    return out;

}
function WhileStatement(code)
{
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'while('+code.Condition+')';
    return out;
}
function IfStatement(code,count)
{
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'if('+code.Condition+')';
    if(code.Color=='Green')
        greenIfs.push(count);
    else if(code.Color=='Red')
        redIfs.push(count);
    return out;
}
function ElseIfStatement(code,count)
{
    if(code.Color=='Green')
        greenIfs.push(count);
    else if(code.Color=='Red')
        redIfs.push(count);
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'else if('+code.Condition+')';
    return out;
}
function ReturnStatement(code)
{
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'return('+code.Value+')';
    return out;
}
function ForStatement(code, begining, update)
{
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'for('+begining.Name+'='+begining.Value+';'+code.Condition+';'+update.Value+')';
    return out;
}
function BlockStatement (code)
{
    let out='';
    let i;
    if(code.Name=='}')
    {
        tabs--;
    }
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    if(code.Name=='{')
    {
        tabs++;
    }
    out=out+code.Name;
    return out;
}

function sort(array)
{
    let i,j;
    for (i=0; i<array.length-1;i++)
    {
        j=i;
        while(array[j+1].Line<array[j].Line)
        {
            let temp = array[j];
            array[j]=array[j+1];
            array[j+1]=temp;
            j++;
            if(j==array.length-1)
                break;
        }
    }
    return array;
}
function Else()
{
    let out='';
    let i;
    for(i=0; i<tabs;i++) {
        out=out+'       ';
    }
    out=out+'else';
    return out;
}