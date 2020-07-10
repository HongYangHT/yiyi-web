###
# @Author: sam.hongyang
 # @LastEditors: sam.hongyang
# @Description: function description
# @Date: 2020-07-01 12:10:27
 # @LastEditTime: 2020-07-10 10:59:29
###
echo "start deployment"
# WEB_PATH='/root/workspace'
# cd $WEB_PATH

echo "ping md5 file"
# 记录 md5值 的文件
md5=package_md5

echo "fetching from remote..."
git reset --hard origin/master
git clean -f
git pull

# 检测的文件
package=package.json

# 创建新的md5信息
package_md5_new=$(md5sum -b $package | awk '{print $1}'|sed 's/ //g')

# 创建md5的函数
function creatmd5()
{
  echo $package_md5_new > $md5
}

# 判断文件是否存在
if [ ! -f $md5 ] ; then
  echo "md5file is not exsit,create md5file......."
  creatmd5
fi

# 读取旧的md5信息
package_md5_old=$(cat $md5|sed 's/ //g')

# 对象对比判断
if [ "$package_md5_new" == "$package_md5_old" ];then
  echo "package.json is not changed"
  creatmd5

  npm install

  echo "start build"
  npm run build:prod
else
  echo "package.json is changed"

  creatmd5

  npm install

  echo "start build"
  npm run build:prod
fi

echo 'build successfully'

nginx -s reload

echo 'nginx reload successful'
