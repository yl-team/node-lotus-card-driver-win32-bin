/**
 * Created by wu on 2016/3/30.
 */


var lt = require('./lib/');
//var lt = require('./build/Release/LotusCardDriver.node');
//var lt = require('./lib/native/node-v46-win32-ia32/LotusCardDriver.node');
//var lt = require('./lib/native/electron-v0.37-win32-ia32/LotusCardDriver.node');

var readData = function(hLotusCard){
    var lp = new lt.LotusCardParamStruct();
    lp.arrKeys[0] = 0xff;
    lp.arrKeys[1] = 0xff;
    lp.arrKeys[2] = 0xff;
    lp.arrKeys[3] = 0xff;
    lp.arrKeys[4] = 0xff;
    lp.arrKeys[5] = 0xff;
    // lp.arrKeys = '123546';
    //console.log(lp.arrKeys[0] );
    //lp.nCardSize = 10;
    //console.log(lp.nCardSize);

    console.log(    lp.arrKeys );
    lp.nKeysSize = 5;


    var nRequestType = lt.RT_ALL;
    console.log(  nRequestType );
    //var nRequestType = 0x26;

    bResult = lt.LotusCardReadData(hLotusCard, nRequestType, 2, 0,0,0,lp);
    if(false == bResult)
    {
        console.log(("调用 LotusCardReadData 失败!"));
        //return;
    }else{
        console.log('arrCardNo' ,lp.arrBuffer );
    }
    
    
    // var dd  = lt.readCardData(hLotusCard);
    // console.log('ad',dd);
    

};

var readCardNo=function(nh){
    var cn = lt.readCardNo(nh);
    console.log(cn);
};

var testWriteRead=function(){
    var nHandle=lt.LotusCardOpenDevice('',0,0,0,200,null);
    for (var i=0;i<1;i++)
        console.log(nHandle);
    var wt = lt.writeData(nHandle,'123456789');
    console.log('write :',wt);
    try{
        var card =  lt.readUserCard(nHandle);
        console.log('card:',card);
        console.log('card_no:',card.card_no);
        console.log('card_token:',card.token);
    }catch(ex){};
    readData(nHandle);
    //lt.Request(nHandle,0x52,);
    //try {
    //    var ret = lt.LotusCardBeep(nHandle, 200);
    //    console.log(ret);
    //}catch(ex) {
    //    console.log(ex);
    //}
    lt.LotusCardCloseDevice(nHandle);

};


function testReadData(){

    var nHandle=lt.LotusCardOpenDevice('',0,0,0,200,null);
    
    readData(nHandle);

    lt.LotusCardCloseDevice(nHandle);

}


function testReadCard(hLotusCard){
    var nHandle=lt.LotusCardOpenDevice('',0,0,0,200,null);
    var dd  = lt.readUserCard(nHandle);
    console.log('card:',dd);
    lt.LotusCardCloseDevice(nHandle);
    
}

function testReadUserCardEx(hLotusCard){
    var nHandle=lt.LotusCardOpenDevice('',0,0,0,200,null);
    var dd  = lt.readUserCardEx(nHandle,"123456");
    console.log('read card ex:',dd);
    lt.LotusCardCloseDevice(nHandle);
    
}

// testReadData();
testReadCard()
// testReadUserCardEx();