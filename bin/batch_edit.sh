#! /bin/bash -e
# -----------------------------------------------------------------------------
#         cppad_swig: A C++ Object Library and SWIG Interface to CppAD
#          Copyright (C) 2017-17 Bradley M. Bell (bradbell@seanet.com)
#              This program is distributed under the terms of the
#          GNU Affero General Public License version 3.0 or later see
#                     http://www.gnu.org/licenses/agpl.txt
# -----------------------------------------------------------------------------
revert_list='
'
move_list='
'
move_sed='s|/local/|/core/|'
#
cat << EOF > junk.sed
s|[Cc][Pp][Pp][Aa][Dd]|Cppad|g
s|Cppad::|CppAD::|g
s|pl_CppAD::|pl_cppad::|g
s|Cppad_swig|cppad_swig|g
s|\$code cppad\$\\\$|Cppad|g
s|<Cppad/|<cppad/|g
s|/Cppad/|/cppad/|g
s|/Cppad.hpp>|/cppad.hpp>|g
s|namespace Cppad|namespace CppAD|g
s|m_Cppad|m_cppad|g
s|prefix/Cppad"|prefix/cppad"|g
#
s|\\([a-z][a-z][a-z]*\\)_Cppad|\\1_cppad|g
s|Cppad_\\([a-z][a-z][a-z]*\\)|cppad_\\1|g
s|\\([A-Z][A-Z][A-Z]*\\)_Cppad|\\1_CPPAD|g
s|Cppad_\\([A-Z][A-Z][A-Z]*\\)|CPPAD_\\1|g
EOF
# -----------------------------------------------------------------------------
if [ $0 != "bin/batch_edit.sh" ]
then
	echo "bin/batch_edit.sh: must be executed from its parent directory"
	exit 1
fi
# -----------------------------------------------------------------------------
# bash function that echos and executes a command
echo_eval() {
	echo $*
	eval $*
}
# -----------------------------------------------------------------------------
cp bin/batch_edit.sh $HOME/trash/batch_edit.sh
git reset --hard
# ---------------------------------------------------------------------------
list_all=`git ls-files`
for file in $list_all
do
	if [ "$file" != 'bin/batch_edit.sh' ]
	then
		sed -f junk.sed  $file > junk.$$
		if ! diff $file junk.$$ > /dev/null
		then
			echo_eval sed -f junk.sed  -i $file
		fi
	fi
done
if [ -e junk.$$ ]
then
	rm junk.$$
fi
# ----------------------------------------------------------------------------
for old in $move_list
do
	new=`echo $old | sed -e "$move_sed"`
	if [ -e "$new" ]
	then
		rm -r "$new"
	fi
	dir=`echo $new | sed -e 's|/[^/]*$||'`
	if [ "$dir" != "$new" ] && [ ! -e "$dir" ]
	then
		echo_eval mkdir $dir
	fi
	echo_eval git mv $old $new
done
# ----------------------------------------------------------------------------
# files that were hand edited and cached using 'git_new.sh to'
if [ -e new ]
then
	echo_eval git_new.sh from
fi
# ----------------------------------------------------------------------------
for file in $revert_list
do
	echo_eval git checkout $file
done
# ----------------------------------------------------------------------------
cp $HOME/trash/batch_edit.sh bin/batch_edit.sh
echo "$0: OK"
exit 0


# -----------------------------------------------------------------------------
echo 'bin/batch_edit.sh: OK'
exit 0