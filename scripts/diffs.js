
import _ from 'lodash'

class Differ{
    constructor(html){
        //this.html2json = require('html2json').html2json;
        //this.json2html = require('html2json').json2html;
        this.diff = require('diff');
        this.html = html;
        //this.json = this.html2json(this.html);
    }

    doParseSite(newHTML = null){
        
        if(newHTML == null ||  newHTML === this.html)
            return {status: "No differences."}
        
       // var newJSON = this.html2json(newHTML);
        //console.log("Initial doc.");
        //console.log(this.json);

        //var newJSON = _.cloneDeep(this.json);
        //newJSON.child[0].child[1].tag = "h2";
        //newJSON.child[0].child[1].child[0].text = "FX was here.";

        //var newHTML = this.json2html(newJSON);
        //console.log("Created html.");

        var differences = this.diff.diffTrimmedLines(this.html, newHTML);

        //console.log("Differences: ");
        //console.log(differences);

        if(!differences || _.size(differences) == 0)
            return {status: "No differences."}
        
        var output = {
            status: "Differences:",
            added: [],
            deleted: []
        };

        var me = this;
        _.forEach(differences, function(part){
            
            if(part.added)
                output.added.push(part.value);
            else if(part.removed)
                output.deleted.push(part.value);

            // var js = { };

            // if(_.has(value, 'rhs'))
            //     js = { node: 'text', text: value.rhs };
            // else if(value.kind == 'D')
            //     js = { node: 'text', text: value.lhs };

            // var elem = me.json2html(js);

            // switch (value.kind) {
            //     case 'N':
            //         output.added.push(elem);
            //         break;
            //     case 'E':
            //         output.edited.push(elem);
            //         break;
            //     case 'D':
            //         output.edited.push(elem);
            //         break;
            //     case 'A':
            //         output.complex.push(elem);
            //         break;
            //     default:
            //         break;
            // }
        });

        // update the last good known config
        this.html = newHTML;
        
        return this.parseOutputToHTML(output);
    }

    parseOutputToHTML(output){

        var areThereDiffs = true;
        if(output.status === "No differences.")
            areThereDiffs = false;
        
        var html = "<h5 style='text-align:center'><b>" + output.status + "</b></h5>" +
                                "<div style='margin: 0px auto; text-align: center; border: 1px solid black;'><ul type='square'>";

        var addedCount = _.size(output.added),
            // editedCount = _.size(output.edited),
            deletedCount = _.size(output.deleted);
            // complexCount = _.size(output.complex);
        var aHTML = "",
            // eHTML = "",
            dHTML = "";
            // cHTML = "";

        if(addedCount != 0){
            html += "<li>Added(" + addedCount + ")</li>";
            _.forEach(output.added, function(value){
                aHTML += "<li>" + value + "</li>";
            });
        }
        // if(editedCount != 0){
        //     html += "<li>Edited(" + editedCount + ")</li>";
        //     _.forEach(output.edited, function(value){
        //         eHTML += "<li>(E)" + value + "</li>";
        //     });
        // }
        if(deletedCount != 0){
            html += "<li>Deleted(" + deletedCount + ")</li>";
            _.forEach(output.deleted, function(value){
                dHTML += "<li>" + value + "</li>";
            });
        }
        // if(complexCount != 0){
        //     html += "<li>Complex(" + complexCount + ")</li>"
        //     _.forEach(output.complex, function(value){
        //         cHTML += "<li>(C)" + value + "</li>";
        //     });
        // }
        html += "</ul></div>";

        return {
            hasDiffs: areThereDiffs,
            summary: html,
            details:    "<h5><p style='color:green;text-align:center;'>Added</p></h5><ul>" + aHTML + "</ul>" + 
                        // "<ul type='square'>" + eHTML + "</ul>" + 
                        "<h5><p style='color:red;text-align:center;'>Removed</p></h5><ul>" + dHTML + "</ul>"
                        // "<ul type='square'>" + cHTML + "</ul>"
        };
    }
}

export {Differ}