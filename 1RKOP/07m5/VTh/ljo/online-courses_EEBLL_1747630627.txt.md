## 在Linux安装Python之注意事项

### 1.Ubuntu装机自带Python2与Python3
/usr/bin 路径下有自带的Python

### 2.最有用的 3 个 Shell 指令
type python
type -a python

which python

whereis python
```
```
pip install package_name #  会下载一个包
```
```
python3 -m pip install package_name
```
-m 代表 module。python -m module_name 意为使用 python 运行该模组。
pip 只是一个 python 模组，只是恰好有命令行快捷方式罢了。

### 4.什么是环境变量 Environmental Variable

环境变量有很多个，PATH 为其中一个。
PATH 指的是，在命令行输入任何指令时，Shell 在电脑的哪些路径中去寻找你所敲的指令。除了 shell builtin 以外，每一个指令都是一个具体的程序（也就是说你可以在系统的各种路径中找到）

```bash
# 你可以通过
ls -a
# 看到这个文件
gedit .bashrc  # 可以打开这个文件

```bash
注意，格式一定是 export PATH=“你要添加的路径:$PATH” ！其中，PATH = 是给 PATH 这个变量赋值。：是路径追加。$PATH 是引用 PATH 的值
```Bash
echo $PATH  # 在命令行里，你可以这样将 PATH 的值打印出来

export PATH="/directory1:/directory2:$PATH"
```
那么因为先搜索到 directory1，所以就会执行 directory1 里面的 python
export PATH="/directory1:$PATH"
# 这种写法也是一样的，意为先追加 directory2 到 PATH 的前面，再追加 direcotry1 到 PATH 前面。
# 所以最终 directory1 在 directory2 前面。
```
```
export PATH="$PATH:/directory2"
export PATH="$PATH:/directory1"
# 如果在原本的 PATH 里面有 python，那么 Shell 根本不会搜索 directory2。
```

### 5.Virtual Environment 是什么？
virtualenv 是一个 Python 模组/工具，可以通过
pip install virtualenv
```
来下载。


假如你在 dir1 路径下，并且你有 python2 和 python3 两个版本。你可以选择性地，使用其中一个 python 作为虚拟环境。它其实就会将对应 python 的解释器以及你所需要的包全部安装到 dir1 下。这样如果你对这个目录下的 python 做出任何修改，是不会影响到系统全局 python 的。

[视频链接]() 尚未录制，敬请期待
