#!/usr/bin/env ruby

require 'erubis'
require 'fileutils'
require 'socket'

def main(opts)
  src_dir = File.expand_path(__dir__)

  Dir.chdir(src_dir)

  my_ip_address = ''
  Socket.ip_address_list.each do |addr_info|
    addr = addr_info.ip_address
    my_ip_address = addr if addr =~ /^10\./
  end
  raise "couldn't figure out my ip address" if my_ip_address.length==0

  for_production = opts.prod

  templates = %w( nginx/nginx.conf.erb  docker-compose.yml.erb )

  templates.each do |tmplt|
    src = src_dir+"/"+tmplt
    tgt file.sub('.erb','')
    erb = File.read(src)
    result = Erubis::Eruby.new(erb).result(binding())
    File.open(tgt, "w") { |f| f.puts(result) }
  end

end



if __FILE__==$0

  require 'optparse'
  require 'ostruct'

  opts = OpenStruct.new
  OptionParser.new do |parser|
    parser.on('-p',
              '--prod',
              'serve app/dist rather than webpack dev_server'
             ) { |o| opts.prod = o }

    opts.usage = parser.help
  end.parse!

  main(opts)
end
