function downloadVideo() {
    var input = document.getElementById('urlInput').value.trim();
    if (input) {
        var downloadUrl = 'https://sfrom.net/' + encodeURIComponent(input);
        window.open(downloadUrl, '_blank');
    } else {
        alert('请输入YouTube视频链接！');
    }
}