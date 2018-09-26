var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
     app.receivedEvent('deviceready');
     console.log("ready  ")
      
      // Read NDEF formatted NFC Tags
      nfc.readerMode(
          nfc.FLAG_READER_NFC_A,
          nfcReadSuccess,
          error => console.log('NFC reader mode failed', error)
      );

      function nfcReadSuccess(nfcTag) {

        console.log("SCANNED");
        console.log(nfcTag)
        console.log(nfcTag.ndefMessage[0].payload);

        var tagContent = nfcTag.ndefMessage[0].payload;
        var tagContentHex = nfc.bytesToHexString(tagContent);

        console.log(tagContentHex);

        var toReadable = hex2a(tagContentHex);

        var runnerArray = toReadable.split(":");
        var runnerName = runnerArray[1];
        var runnerNum = runnerArray[2];

        console.log(runnerName + " " + runnerNum);

        $(".scan-area").css("background", "lightgreen");
        $("h2#waiting").html("Hello " + runnerName);
        $("p#scanned-info").html("Runner ID " + runnerNum);

      } 

      function hex2a(hexx) {
          var hex = hexx.toString();//force conversion
          var str = '';
          for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
              str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          return str;
      }

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();