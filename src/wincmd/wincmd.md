# ⌨️ windows 命令行相关记录

## echo

1. 对文件的操作, 没有这个文件会自动创建这个文件

创建的这个文件格式可能**不是 utf-8**, 可能会报错

```bash
# 覆盖文件内容
echo "新内容" > file.txt

# 追加内容到文件末尾
echo "Hello World" >> file.txt
```

## mkdir

创建目录

```bash
mkdir directory_name
```
