import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    model: any = {}; 
    //tmpArray: any;
    rogersArray: any;
    updatedArray:any;
    checkedArray:any;
    uncheckedArray:any;
    constructor(){
        //this.tmpArray = [];
        this.rogersArray = [];
        this.updatedArray = [];
        this.checkedArray = [];
        this.uncheckedArray = [];
        this.model = {
              txtInputName: '',
        };
        this.rogersArray = ["pants", "jacket", "iphone charger", "mack book", "shoes", "hat", "t-shirt", "belt"];
        localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
    }

    addData(name){ /** User can insert data into unpcked list */
        //console.log(this.model.txtInputName);
        if(this.model.txtInputName != ''){
          let itemName = this.model.txtInputName.toLowerCase();
          this.rogersArray.push(itemName);
          localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
          this.rogersArray = JSON.parse(localStorage.getItem("tmpArray"));
          //this.rogersArray.push(name);
          this.model.txtInputName = '';
          this.model.errorMsg = '';
        } else { 
          alert('please enter value');
        }
    }

    removeSingleUnCheckedItem(targetItem){ /** User remove one by one item from single un packed item */
      let ind = this.rogersArray.indexOf(targetItem);
      this.rogersArray.splice(ind,1);
      //console.log(this.rogersArray);
      localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
    }

    removeToNext(val){   /** User can select item and transfer into packed list */
        //console.log(val);
        let index = this.rogersArray.indexOf(val);
        this.rogersArray.splice(index,1);
        this.appendData(val);
        localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
    }

    appendData(newVal){ /** Append selected item in new packed attay */
        //console.log(newVal);
        this.updatedArray.push(newVal);
        localStorage.setItem("tmpUpdateArray", JSON.stringify(this.updatedArray));
        localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
        //console.log(this.updatedArray);
    }

    backToExist(oldVal){ /** User can unpacked item from packed list when click on check box item */
      this.rogersArray.push(oldVal);
      let index = this.updatedArray.indexOf(oldVal);
      this.updatedArray.splice(index,1);
      localStorage.setItem("tmpUpdateArray", JSON.stringify(this.updatedArray));
      localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
      //console.log(this.rogersArray);
    }

    searchUnchecked(searchtext){ /** User can search item from only unpacked list */
      let sUtext = searchtext.toLowerCase();
      let localArray = JSON.parse(localStorage.getItem("tmpArray"));
      //console.log(localArray);
      function searchFromList(item) {
        return item.indexOf(sUtext) !== -1;
      }
      this.rogersArray = localArray.filter(searchFromList);
    }

    searchChecked(searchCheckedtext){ /** User can search item from packed list */
      let sCtext = searchCheckedtext.toLowerCase();
      let tmpUpdatedArray = JSON.parse(localStorage.getItem("tmpUpdateArray"));
      function searchFromList(item) {
        return item.indexOf(sCtext) !== -1;
      }
      this.updatedArray = tmpUpdatedArray.filter(searchFromList);
    }

    removeSingleCheckedItem(targetItem){ /** User can remove one by one item from checked list */
      let x = this.updatedArray.indexOf(targetItem);
      this.updatedArray.splice(x,1);
      //console.log(this.updatedArray);
      localStorage.setItem("tmpUpdateArray", JSON.stringify(this.updatedArray));
    }

    markAllUnpacked(){ /** User can press mark all button and move all item into unpacked list */
      let checkedA = JSON.parse(localStorage.getItem("tmpUpdateArray"));
      this.rogersArray.push(...checkedA);
      localStorage.clear();
      localStorage.setItem("tmpArray", JSON.stringify(this.rogersArray));
      let getFreshArray = JSON.parse(localStorage.getItem("tmpArray"));
      this.rogersArray = getFreshArray;
      this.updatedArray = [];
    }


}
