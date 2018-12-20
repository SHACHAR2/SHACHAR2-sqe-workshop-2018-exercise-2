import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
//import {describe} from 'nyc';

describe('The javascript parser', () => {

    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '[{"Line":"","Type":"","Name":"","Condition":"","Value":"","Color":""}]'
        );

    });
});
describe('The javascript parser', () => {
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;', '(1)')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"1","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is empty function without varibles correctly ', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(x){}','(1)')),
            '[{"Line":1,"Type":"function declaration","Name":"binarySearch(x)","Condition":"","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is empty function without varibles correctly ', () => {
        assert.equal(
            JSON.stringify(parseCode('function binarySearch(x){}','([1,2,3])')),
            '[{"Line":1,"Type":"function declaration","Name":"binarySearch(x)","Condition":"","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is empty function with variables correctly ', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x, y, z){\n' +
                'let a = x + 1;\n' +
                '    let b = a + y;\n' +
                '    let c = 0;\n' +
                '    if (b < z) {\n' +
                '        c = c + 5;\n' +
                '        return x + y + z + c;\n' +
                '    }} \n', '(1,2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},{"Line":8,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"x + 1","Color":""},{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"x + 1 + y","Color":""},' +
            '{"Line":4,"Type":"variable declaration","Name":"c","Condition":"","Value":"0","Color":""},{"Line":5,"Type":"if statement","Name":"","Condition":"x + 1 + y < z","Value":"","Color":"Red"},' +
            '{"Line":5,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},{"Line":8,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},{"Line":6,"Type":"assignment expression","Name":"c","Condition":"","Value":"0 + 5","Color":""},' +
            '{"Line":7,"Type":"return statement","Name":"","Condition":"","Value":"((x + y) + z) + 0 + 5","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple variable declaration with no value correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a;\n' +
                'function foo(x,y,z){}','(1,2,3)')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":null,"Color":""},{"Line":2,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},{"Line":2,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });});

describe('The javascript parser', () => {
    it('is parsing a simple assigment expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z) {\n' +
                'let a=0;\n'+
                'a=x+5}','(1,2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},{"Line":3,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}'+
            ',{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"0","Color":""},{"Line":3,"Type":"assignment expression","Name":"a","Condition":"","Value":"x + 5","Color":""}]');
    });
});
describe('The javascript parser', () => {
    it('is parsing a assigment expression to local and global varibles correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z) {\n' +
                'let a=0;\n'+
                'a=5\n'+
                'x=a}','(1,2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},{"Line":4,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}'+
            ',{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"0","Color":""},{"Line":3,"Type":"assignment expression","Name":"a","Condition":"","Value":"5","Color":""},'+
            '{"Line":4,"Type":"assignment expression","Name":"x","Condition":"","Value":"5","Color":""}]');
    });
});


describe('The javascript parser', () => {
    it('is parsing a simple while statement with no value correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('while(true){}','(5)')),
            '[{"Line":1,"Type":"while statement","Name":"","Condition":"true","Value":"","Color":""},{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""}'+
            ',{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple while statement with binary expression in the condition and block statment with two lines correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a=(5+5)*(4+5)','(5)')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"(5 + 5) * (4 + 5)","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple Computed Member Expression correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('low=V[5]+1;','(5)')),
            '[{"Line":1,"Type":"assignment expression","Name":"low","Condition":"","Value":"V[5] + 1","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(2==2){}','(2)')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"2 == 2","Value":"","Color":"Green"},'+
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""}'+
            ',{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple if statment with simple alternate correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(3==2){\n' +
                'let a=mid[5]+1;}\n' +
                'else\n' +
                'i=0;','(2)')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"3 == 2","Value":"","Color":"Red"},'+
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""}'+
            ',{"Line":2,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"mid[5] + 1","Color":""},' +
            '{"Line":4,"Type":"else","Name":"","Condition":"","Value":"","Color":""},'+
            '{"Line":4,"Type":"assignment expression","Name":"i","Condition":"","Value":"0","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a else if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if(2==2){\n' +
                    'let a=mid[5]+1;}\n' +
                    'else if(7<5){\n' +
                    'let i=0;}','(2)')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"2 == 2","Value":"","Color":"Green"},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},'+
            '{"Line":2,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"mid[5] + 1","Color":""},' +
            '{"Line":3,"Type":"else if statement","Name":"","Condition":"7 < 5","Value":"","Color":"Red"},' +
            '{"Line":3,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},'+
            '{"Line":4,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":4,"Type":"variable declaration","Name":"i","Condition":"","Value":"0","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = null;', '(1)')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"null","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple for correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('for(i=0; i<7;i++){}','(2)')),
            '[{"Line":1,"Type":"for statement","Name":"","Condition":"i < 7","Value":"","Color":""},{"Line":1,"Type":"assignment expression","Name":"i","Condition":"","Value":"0","Color":""},' +
            '{"Line":1,"Type":"update expression","Name":"i","Condition":"","Value":"i++","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = -1;', '(1)')),
            '[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":"-1","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if((2==2) && (3==3)){}','(2)')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"2 == 2 && 3 == 3","Value":"","Color":"Green"},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});
describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('if((2==2) || (3==3)){}','(2)')),
            '[{"Line":1,"Type":"if statement","Name":"","Condition":"2 == 2 || 3 == 3","Value":"","Color":"Green"},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z)\n' +
                '{\n' +
                'let c;\n' +
                'if(x.length == 3 && y== \'hello\') \n' +
                '{}\n' +
                '}','([1,2,3], \'hello\' ,1)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},'+
            '{"Line":2,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},'+
            '{"Line":6,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},'+
           '{"Line":3,"Type":"variable declaration","Name":"c","Condition":"","Value":null,"Color":""},'+
            '{"Line":4,"Type":"if statement","Name":"","Condition":"x.length == 3 && y == \'hello\'","Value":"","Color":"Green"},'+
             '{"Line":5,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},'+
              '{"Line":5,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x){\n' +
            'let a=[1,2,3];\n' +
            'let b=1;\n' +
            'a[0]=x[b+x[0]];\n' +
            'return a[0];}'
                , '([1,2,3])')), '[{"Line":1,"Type":"function declaration","Name":"foo(x)","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":5,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"[1, 2, 3]","Color":""},' +
            '{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"1","Color":""},' +
            '{"Line":4,"Type":"assignment expression","Name":"a[0]","Condition":"","Value":3,"Color":""},' +
            '{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":3,"Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x){\n' +
                'let a=[1,2,3];\n' +
                'let b=1;\n' +
                'x[0]=x[b+x[0]];\n' +
                'return a[0];}'
                , '([1,2,3])')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x)","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":5,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"[1, 2, 3]","Color":""},' +
            '{"Line":3,"Type":"variable declaration","Name":"b","Condition":"","Value":"1","Color":""},' +
            '{"Line":4,"Type":"assignment expression","Name":"x[0]","Condition":"","Value":3,"Color":""},' +
            '{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":1,"Color":""}]'
        );
    });
});

describe('The javascript parser', () => {
    it('is parsing a simple if statment correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y){\n' +
                'let a=[1,2,3];\n' +
                'a[0]=x[1+x[y]];\n' +
                'return a[0];}'
                , '([1,2,3],0)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y)","Condition":"","Value":"","Color":""},'+
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":4,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"[1, 2, 3]","Color":""},' +
            '{"Line":3,"Type":"assignment expression","Name":"a[0]","Condition":"","Color":""},'+
            '{"Line":4,"Type":"return statement","Name":"","Condition":"","Color":""}]'
        );
    });
});


describe('The javascript parser', () => {
    it('is parsing a assigment expression to local and global varibles correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z) {\n' +
                'let a=0;\n'+
                'a=\'king\'\n'+
                'if(a == x[0]){\n' +
                '    return y + x * 2\n' +
                '  }}','([\'nir\',1,2],2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":6,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"0","Color":""},' +
            '{"Line":3,"Type":"assignment expression","Name":"a","Condition":"","Value":"\'king\'","Color":""},' +
            '{"Line":4,"Type":"if statement","Name":"","Condition":"\'king\' == \'nir\'","Value":"","Color":"Red"},' +
            '{"Line":4,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":6,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":5,"Type":"return statement","Name":"","Condition":"","Value":"y + (x * 2)","Color":""}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a assigment expression to local and global varibles correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z) {\n' +
                'let a=[\'nir\',1,2];\n'+
                'return a[1]}','(1,2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":3,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"[\'nir\', 1, 2]","Color":""},'+
            '{"Line":3,"Type":"return statement","Name":"","Condition":"","Value":1,"Color":""}]');
    });
});

describe('The javascript parser', () => {
    it('is parsing a assigment expression to local and global varibles correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('function foo(x,y,z) {\n' +
                'let a=[\'nir\',1,2];\n'+
                'a[1]=[0]}','([\'nir\'],2,3)')),
            '[{"Line":1,"Type":"function declaration","Name":"foo(x,y,z)","Condition":"","Value":"","Color":""},' +
            '{"Line":1,"Type":"Block statement","Name":"{","Condition":"","Value":"","Color":""},' +
            '{"Line":3,"Type":"Block statement","Name":"}","Condition":"","Value":"","Color":""},' +
            '{"Line":2,"Type":"variable declaration","Name":"a","Condition":"","Value":"[\'nir\', 1, 2]","Color":""},' +
            '{"Line":3,"Type":"assignment expression","Name":"a[1]","Condition":"","Value":"[0]","Color":""}]');
    });
});