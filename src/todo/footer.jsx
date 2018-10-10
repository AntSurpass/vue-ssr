import '../style/footer.scss';

export default {
  data() {
    return {
      title: '页脚'
    }
  },
  render() {
    return (
      <div id="footer">
        {this.title}
      </div>
    )
  }
}